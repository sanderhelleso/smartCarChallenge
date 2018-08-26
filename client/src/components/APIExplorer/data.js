const DATA = [
  {
    title: 'Add new user',
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'POST',
    description: 'Add a new user to the endpoint',
    body: [
      {
        name: 'email',
        type: 'email',
        max: 24,
        min: 3,
        placeholder: 'jonh@doe.com'
      },
      {
        name: 'full-name',
        type: 'text',
        placeholder: 'John Doe',
        required: true,
      },
      {
        name: 'phone',
        type: 'tel',
        pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
        placeholder: '133-700-1337'
      },
    ],
  },
  {
    title: 'Get users',
    url: 'https://jsonplaceholder.typicode.com/users',
    method: 'GET',
    description: 'Get all users from the endpoint'
  }
]

export default DATA;