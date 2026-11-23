import test from 'node:test';import assert from 'node:assert/strict';import {scenarios,initial,act,report} from '../dist/engine.js';
for(const s of scenarios){test(s.name+' can be diagnosed and resolved',()=>{let state=act(initial(s.id),'inspect');assert.equal(state.inspected,true);state=act(state,s.answer);assert.equal(state.resolved,true);assert.equal(state.health,100);assert.equal(state.score,100);assert.match(report(state),/Contained/);assert.equal(act(state,'restart'),state);});}
test('incorrect actions penalize score without going below zero',()=>{let s=initial();for(let i=0;i<40;i++)s=act(s,'restart');assert.equal(s.score,0);assert.equal(s.health,5);assert.equal(s.resolved,false);assert.equal(s.events.length,40);});
test('guessing correct action costs evidence points',()=>assert.equal(act(initial(),'rollback').score,85));
test('invalid actions have no effect',()=>{const s=initial();assert.equal(act(s,'invalid'),s);assert.equal(initial('invalid').id,'deploy');});
