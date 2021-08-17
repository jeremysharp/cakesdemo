module.exports = {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Cakes API',
        description: 'API documentation',
        contact: {
            name: 'Jeremy Sharp',
        },
    },
    host: 'localhost:4000',
    schemes: ['http', 'https'],
    consumes: ['application/json', 'multipart/form-data'],
    produces: ['application/json', 'image/*'],

    definitions: {
        Cake: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Name of cake',
                    example: 'Fruit cake',
                },
                comment: {
                    type: 'string',
                    description: 'Description or other comment',
                    example: 'A rich sponge with fruit',
                },
                yumFactor: {
                    type: 'integer',
                    description: 'Description or other comment',
                    example: 2,
                },
                imageUrl: {
                    type: 'string',
                    description: 'The filename for the cake',
                    example: '1-fruitcake.jpg',
                },
            },
        },
        Cakes: {
            type: 'object',
            properties: {
                cakes: {
                    type: 'object',
                    additionalProperties: {
                        $ref: '#definitions/Cake',
                    },
                },
            },
        },
    },
    paths: {
        '/api/': {
            get: {
                summary: 'Get all cakes',
                responses: {
                    200: {
                        description: 'A JSON object containing an array of cakes',
                        schema: {
                            $ref: '#/definitions/Cakes',
                        },
                    },
                    500: {
                        description: 'Get cakes failed',
                    },
                },
            },
        },
        '/api/cake/{id}': {
            get: {
                summary: 'Get specific cake',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'integer',
                        },
                        required: true,
                        description: 'cake ID',
                        example: 1,
                    },
                ],
                responses: {
                    200: {
                        description: 'A JSON object containing a cake',
                        schema: {
                            $ref: '#/definitions/Cake',
                        },
                    },
                    500: {
                        description: 'Get cake failed',
                    },
                },
            },
            delete: {
                summary: 'Delete specific cake',
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        schema: {
                            type: 'integer',
                        },
                        required: true,
                        description: 'cake ID',
                        example: 1,
                    },
                ],
                responses: {
                    200: {
                        description: 'Successful deletion',
                    },
                    500: {
                        description: 'Delete cake failed',
                    },
                },
            },
        },
        '/api/image/{imageUrl}': {
            get: {
                summary: 'Get cake image',
                parameters: [
                    {
                        in: 'path',
                        name: 'imageUrl',
                        schema: {
                            type: 'string',
                        },
                        required: true,
                        description: 'Image filename',
                        example: '1-fruitcake.jpg',
                    },
                ],
                responses: {
                    200: {
                        description: 'A jpeg, png or gif binary image',
                        content: 'image/*',
                    },
                    500: {
                        description: 'Get image failed',
                    },
                },
            },
        },
        '/api/cake': {
            post: {
                summary: 'Save cake',
                consumes: ['application/json'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#definitions/Cake',
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Success',
                    },
                    500: {
                        description: 'Save cake failed',
                    },
                },
            },
        },

        '/api/image': {
            post: {
                summary: 'Upload image',
                consumes: ['multipart/form-data'],
                parameters: [
                    {
                        in: 'formData',
                        name: 'image',
                        type: 'file',
                        description: 'The image for the cake.',
                    },
                ],
                responses: {
                    '200': {
                        description: 'Success',
                    },
                    500: {
                        description: 'Save cake failed',
                    },
                },
            },
        },
    },

    apis: [`${process.cwd()}/src/routes/*.js`],
};
