import {randomUUID,createHash} from 'node:crypto';
import {required,issueKey,id,newExercise,eventRecord,adf,postmortemHtml} from './domain.js';
export function makeService({store,jira,confluence,now=()=>new Date().toISOString(),uuid=randomUUID}){
 const owner=ctx=>{if(!ctx?.accountId)throw Error('Sign in to Atlassian to use Ghostlight.');return createHash('sha256').update(ctx.accountId).digest('hex').slice(0,32);};
 const prefix=ctx=>`exercise:${owner(ctx)}:`;
 const key=(ctx,value)=>prefix(ctx)+id(value);
 async function load(ctx,value){const s=await store.get(key(ctx,value));if(!s)throw Error('Exercise not found in your workspace.');await jira.getIssue(s.source.key);return s;}
 async function save(ctx,s){await store.set(key(ctx,s.id),s);return s;}
 return {
 async list(ctx){return (await store.list(prefix(ctx))).sort((a,b)=>b.startedAt.localeCompare(a.startedAt)).map(s=>({id:s.id,title:s.title,status:s.status,startedAt:s.startedAt,sourceKey:s.source.key}));},
 async inspect(ctx,p){owner(ctx);const issue=await jira.getIssue(issueKey(p.issueKey));return {key:issue.key,summary:issue.fields.summary,status:issue.fields.status?.name,priority:issue.fields.priority?.name,assignee:issue.fields.assignee?.displayName,updated:issue.fields.updated,description:issue.fields.description,links:issue.fields.issuelinks||[]};},
 async create(ctx,p){owner(ctx);const issue=await jira.getIssue(issueKey(p.issueKey));return save(ctx,newExercise(p,issue,now(),uuid()));},
 async get(ctx,p){return load(ctx,p.id);},
 async addEvent(ctx,p){const s=await load(ctx,p.id);return save(ctx,eventRecord(s,p.kind,p.body,now(),uuid()));},
 async review(ctx,p){const s=await load(ctx,p.id);return save(ctx,{...s,summary:typeof p.summary==='string'?p.summary.slice(0,4000):'',rootCause:typeof p.rootCause==='string'?p.rootCause.slice(0,4000):''});},
 async complete(ctx,p){const s=await load(ctx,p.id);return s.status==='complete'?s:save(ctx,{...s,status:'complete',endedAt:now()});},
 async issueTypes(ctx,p){const s=await load(ctx,p.id);return jira.issueTypes(s.source.projectId);},
 async createFollowup(ctx,p){const s=await load(ctx,p.id);if(s.status!=='complete')throw Error('Complete the exercise first.');if(s.followups.length>=30)throw Error('Follow-up limit reached.');const summary=required(p.summary,'Issue summary',200),typeId=required(p.issueTypeId,'Issue type',50);const types=await jira.issueTypes(s.source.projectId);if(!types.some(t=>t.id===typeId&&!t.subtask))throw Error('Select an available non-subtask issue type.');const result=await jira.createIssue({fields:{project:{id:s.source.projectId},issuetype:{id:typeId},summary,labels:['ghostlight-rehearsal'],description:adf(`Follow-up from Ghostlight rehearsal: ${s.title}\nSource incident: ${s.source.key}\n\n${required(p.description,'Follow-up description')}\n\nRoot cause: ${s.rootCause||'Not recorded'}`)}});const next={...s,followups:[...s.followups,{key:result.key,summary}]};try{return await save(ctx,next);}catch{throw Error(`Jira issue ${result.key} was created, but saving its reference failed. Record the key; do not retry creation.`);}},
 async spaces(ctx){owner(ctx);return confluence.spaces();},
 async publish(ctx,p){const s=await load(ctx,p.id);if(s.status!=='complete')throw Error('Complete the exercise before publishing.');if(s.pageId)return s;const spaceId=required(p.spaceId,'Confluence space',50);if(!/^\d+$/.test(spaceId))throw Error('Invalid space.');const page=await confluence.createPage({spaceId,status:'current',title:`Ghostlight: ${s.title} (${s.id.slice(0,8)})`,body:{representation:'storage',value:postmortemHtml(s)}});try{return await save(ctx,{...s,pageId:page.id});}catch{throw Error(`Confluence page ${page.id} was published, but saving its reference failed. Do not retry; find it in Confluence.`);}}
 };}
