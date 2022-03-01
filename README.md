## Axios and Mirage Example

This application is a tiny React app to demonstrate two core concepts:

1. Axios: Axios can be used to more elegantly manage Authroization requests (i.e., Bearer tokens) while maintaining more consistent standards for writing API calls
2. Mirage: Mirage can be used to intercept API requests in order to decouple the need for a functioning API for local UI development

## Notable Files

- `src/App.jsx`: Logic for manually checking token
- `src/components`: Logic for calling API
- `src/mirage.js`: Implementation of Mirage Server
- `src/api`: Implement of Axios
