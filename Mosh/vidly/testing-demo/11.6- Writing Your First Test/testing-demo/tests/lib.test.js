const lib = require('../lib')
//Testing numbers...
describe('absolute',() => {
   it('should return positive number if input is positive', () => {
const result = lib.absolute(1);
expect(result).toBe(1);
});

it('should return positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
    });
    
it('should return 0 if input is zero ', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
    }); 
})
//Testing strings....
describe('greet', () => {
it('should return the greeting message',() => {
 const result = lib.greet('Mosh')
 expect(result).toMatch(/Mosh/);
 expect(result).toContain('Mosh')
});
});

//Testing Arrays...
describe('getCurrencies', () => {

it('should return supported currencies',() => {
    const result = lib.getCurrencies();
    //assertion:

    //Too general 
    expect(result).toBeDefined();

    //Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);

    //Proper way 
    //check for the existence
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');

    //ideal way 
    expect(result).toEqual(expect.arrayContaining(['EUR','USD','AUD']))

   
   
})
})

describe('getProduct',() => {
    it('Should return the product with the given id',() => {
      const result = lib.getProduct(1);
      /* here using toBe will return an error since
       it also compares the memory location of the 
       compared objects so use toEqual as it only checks
       object equality irregardless of the memory location*/
    //   expect(result).toEqual({id:1,price:10});//exact check
      expect(result).toMatchObject({id:1,price:10});//check common properties
      
      expect(result).toHaveProperty('id',1);
    })
    });

//Testing Exceptions
describe('Register User',()=>{
    it('should throw if username is falsy',() => {
        //null
        //undefined
        //NaN
        //''
        //0
        //false
const args =[null,undefined,NaN,'',0,false];
args.forEach(a =>{
    expect(() => {lib.registerUser(a)}).toThrow();
})
    })
it('should return a user object if valid username is passed',() => {
const result = lib.registerUser('mosh');
expect(result).toMatchObject({username : 'mosh'});
expect(result.id).toBeGreaterThan(0);
})
})
