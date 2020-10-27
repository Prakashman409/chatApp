let expect=require('expect');
let messageGenerator=require('./messageGenerator');

describe('Generate Message',()=>{
    it('it should generate correct message object',()=>{
        let from="prakash";
        let text="Some random texts";
        let message=messageGenerator(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});