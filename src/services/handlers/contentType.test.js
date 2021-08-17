const contentType = require('./contentType');

test('returns content type from filename', ()=>{
    expect(contentType('testname.png')).toBe('image/png')
    expect(contentType('testname.jpg')).toBe('image/jpeg')
    expect(contentType('testname.gif')).toBe('image/gif')
    expect(contentType('testname.other')).toBe('image/unknown')
})