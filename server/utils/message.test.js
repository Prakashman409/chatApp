let expect=require('expect');
let {messageGenerator,generateLocation}=require('./messageGenerator');

describe('Generate Message',()=>{
    it('it should generate correct message object',()=>{
        let from="prakash";
        let text="Some random texts";
        let message=messageGenerator(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('Generate Location',()=>{
    it('it should generate correct location',()=>{
        let lat=28;
        let long=33
        let url=`https://www.google.com/maps?q=${lat},${long}`
        let location=generateLocation(lat,long);
        expect(typeof location.createdAt).toBe('number');
        expect(location).toMatchObject({lat,long});
    })
})