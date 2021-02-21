const SwaggerProperties = {
  shared: {
    messages: {
      minMaxLength:
        '$property must contain between $constraint1 and $constraint2 characters',
    },
    uuid: {
      description: 'UUID for user account identification',
      example: '71b3c064-a7df-4a6c-9588-dc347a284558',
      type: 'string',
    },
    createdAt: {
      description: 'Registry creation date',
      example: '1990-01-01 00:00:00',
      type: 'string',
    },
    updatedAt: {
      description: 'Registry creation date',
      example: '1990-01-01 00:00:00',
      type: 'string',
    },
  },
  modules: {
    user: {
      username: {
        description: 'Unique username used on login and display',
        example: 'johndoe',
        minLength: 3,
        maxLength: 30,
      },
      password: {
        description: 'Password used on login',
        example: 'mypassword',
        minLength: 6,
        maxLength: 30,
      },
    },
  },
};

export default SwaggerProperties;
