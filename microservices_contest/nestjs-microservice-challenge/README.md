# NestJS Microservices Challenge

Welcome to the NestJS microservices challenge. The goal is to implement small microservice features using NestJS microservices (TCP transport) and submit a working implementation.

Objectives:
- Implement the missing logic in EchoService (sum and fibonacci methods).
- Ensure the microservice responds correctly to the following message patterns: "echo", "sum", "fibonacci".
- Provide a short explanation of your solution in README and any optimizations.

How to run (local):
1. Install dependencies: npm install
2. Start the server: npm run start:server
3. In another terminal, run the client to send requests: npm run start:client

Message patterns (client -> server):
- pattern: 'echo' payload: any -> server should reply the same payload.
- pattern: 'sum' payload: number[] -> server should reply with the sum of the numbers.
- pattern: 'fibonacci' payload: number -> server should reply with the N-th Fibonacci number (0-indexed). For large N, consider iterative or memoized approach.

Challenge tasks:
1. Open src/echo/echo.service.ts and implement the TODOs for sum and fibonacci.
2. Run the client and verify the responses.
3. (Optional) Add unit tests or property tests for edge cases (negative numbers, large N, non-integer input).

Acceptance criteria:
- Server replies correctly for the three patterns.
- Code is reasonably documented and types are used.

Notes:
- This project uses TypeScript and ts-node for convenience. You can compile with tsc if you prefer.