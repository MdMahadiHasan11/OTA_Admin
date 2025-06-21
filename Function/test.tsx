"use client";
import { useState } from "react";

// Define a TypeScript interface for the data
interface User {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
}

export default function Modal() {
  // Initialize state with sample array of users
  const [users] = useState<User[]>([
    { id: 1, name: "Alice", age: 25, isActive: true },
    { id: 2, name: "Bob", age: 30, isActive: false },
    { id: 3, name: "Charlie", age: 35, isActive: true },
    { id: 4, name: "David", age: 28, isActive: false },
  ]);

  // id set find user
  const userById = new Map(users.map((user) => [user.id, user]));
  const result = userById.get(1);
  console.log(result);

  // --- Array Methods ---

  // 1. map: Transforms each element; Returns a new array of transformed values
  // Purpose: Extract user names into a new array
  // Return: string[] (e.g., ["Alice", "Bob", "Charlie", "David"])
  const userNames = users.map((user) => user.name);

  // 2. filter: Creates a new array with elements that pass a test
  // Purpose: Get users where isActive is true
  // Return: User[] (e.g., [{ id: 1, name: "Alice", ... }, { id: 3, name: "Charlie", ... }])
  const activeUsers = users.filter((user) => user.isActive);
  console.log("Active users:", activeUsers);

  // 3. reduce: Reduces array to a single value by applying a function
  // Purpose: Calculate total age of all users
  // Return: number (e.g., 25 + 30 + 35 + 28 = 118)
  const totalAge = users.reduce((sum, user) => sum + user.age, 0);

  // 3b. reduce: Groups users by age into an object
  // Purpose: Create an object where keys are ages and values are arrays of users
  // Return: { [key: number]: User[] } (e.g., { 25: [{Alice}], 30: [{Bob}], 35: [{Charlie}], 28: [{David}] })
  const ageObject = users.reduce(
    (acc: { [key: number]: User[] }, user: User) => {
      const age = user.age;
      acc[age] = acc[age] || [];
      acc[age].push(user);
      return acc;
    },
    {}
  );
  console.log(ageObject);

  // 4. forEach: Executes a function for each element; no return value (void)
  // Purpose: Log each user's name to console
  // Return: void
  users.forEach((user) => console.log(`User: ${user.name}`));

  // 5. find: Returns the first element that satisfies a condition
  // Purpose: Find the first user over 30 years old
  // Return: User | undefined (e.g., { id: 3, name: "Charlie", age: 35, isActive: true })
  const userOver30 = users.find((user) => user.age > 30);

  // 6. some: Checks if at least one element satisfies a condition
  // Purpose: Check if any user is active
  // Return: boolean (e.g., true, since Alice and Charlie are active)
  const hasActiveUser = users.some((user) => user.isActive);

  // 7. every: Checks if all elements satisfy a condition
  // Purpose: Check if all users are over 20
  // Return: boolean (e.g., true, since all users are over 20)
  const allOver20 = users.every((user) => user.age > 20);

  // 8. slice: Returns a shallow copy of a portion of the array
  // Purpose: Get the first two users
  // Return: User[] (e.g., [{ id: 1, name: "Alice", ... }, { id: 2, name: "Bob", ... }])
  const firstTwoUsers = users.slice(0, 2);

  // 9. sort: Sorts the array (copy used to avoid mutating state)
  // Purpose: Sort users by age in ascending order
  // Return: User[] (e.g., [{Alice, 25}, {David, 28}, {Bob, 30}, {Charlie, 35}])
  const sortedByAge = [...users].sort((a, b) => a.age - b.age);

  // 10. includes: Checks if an array includes a specific value
  // Purpose: Check if "Alice" is in userNames
  // Return: boolean (e.g., true)
  const hasAlice = userNames.includes("Alice");

  // 11. findIndex: Returns the index of the first element that satisfies a condition
  // Purpose: Find index of first user over 30
  // Return: number (e.g., 2 for Charlie, or -1 if not found)
  const indexOver30 = users.findIndex((user) => user.age > 30);

  // 12. concat: Merges two or more arrays
  // Purpose: Combine users with a new array of users
  // Return: User[] (e.g., original users plus [{ id: 5, name: "Eve", ... }])
  const moreUsers: User[] = [{ id: 5, name: "Eve", age: 22, isActive: true }];
  const combinedUsers = users.concat(moreUsers);

  // 13. join: Joins all elements into a string
  // Purpose: Create a comma-separated string of user names
  // Return: string (e.g., "Alice, Bob, Charlie, David")
  const namesString = userNames.join(", ");

  // 14. reverse: Reverses the array (copy used to avoid mutating state)
  // Purpose: Reverse the order of users
  // Return: User[] (e.g., [{David}, {Charlie}, {Bob}, {Alice}])
  const reversedUsers = [...users].reverse();

  // 15. push: Adds elements to the end of an array (copy used)
  // Purpose: Add a new user to a copy of the array
  // Return: number (new length of array, e.g., 5)
  const usersWithNew = [...users];
  const pushLength = usersWithNew.push({
    id: 5,
    name: "Eve",
    age: 22,
    isActive: true,
  });
  console.log("Push length:", pushLength);

  // 16. pop: Removes the last element (copy used)
  // Purpose: Remove the last user from a copy of the array
  // Return: User | undefined (e.g., { id: 4, name: "David", ... })
  const usersWithoutLast = [...users];
  const poppedUser = usersWithoutLast.pop();

  // 17. shift: Removes the first element (copy used)
  // Purpose: Remove the first user from a copy of the array
  // Return: User | undefined (e.g., { id: 1, name: "Alice", ... })
  const usersWithoutFirst = [...users];
  const shiftedUser = usersWithoutFirst.shift();

  // 18. unshift: Adds elements to the start of an array (copy used)
  // Purpose: Add a new user to the start of a copy of the array
  // Return: number (new length of array, e.g., 5)
  const usersWithNewStart = [...users];
  const unshiftLength = usersWithNewStart.unshift({
    id: 0,
    name: "Zoe",
    age: 20,
    isActive: false,
  });
  console.log("Unshift length:", unshiftLength);

  // 19. splice: Removes/adds elements at a specific index (copy used)
  // Purpose: Replace user at index 1 with a new user
  // Return: User[] (array of removed elements, e.g., [{ id: 2, name: "Bob", ... }])
  const splicedUsers = [...users];
  const splicedRemoved = splicedUsers.splice(1, 1, {
    id: 6,
    name: "Frank",
    age: 40,
    isActive: true,
  });
  console.log(splicedRemoved);

  // 20. flat: Flattens a nested array to specified depth
  // Purpose: Flatten a nested number array
  // Return: number[] (e.g., [1, 2, 3, 4, 5, 6, 7])
  const nestedArray = [
    [1, 2],
    [3, 4],
    [5, [6, 7]],
  ];
  const flattenedArray = nestedArray.flat(2);

  // 21. flatMap: Maps each element and flattens the result
  // Purpose: Double user IDs and flatten into a single array
  // Return: number[] (e.g., [1, 2, 2, 4, 3, 6, 4, 8])
  const userIdsDoubled = users.flatMap((user) => [user.id, user.id * 2]);

  // 22. at: Gets element at specified index (supports negative indices)
  // Purpose: Get the last user
  // Return: User | undefined (e.g., { id: 4, name: "David", ... })
  const lastUser = users.at(-1);

  // --- Loops with Arrays ---

  // 23. for loop: Traditional loop over indices
  // Purpose: Collect user names
  // Return: string[] (e.g., ["Alice", "Bob", "Charlie", "David"])
  const forLoopNames: string[] = [];
  for (let i = 0; i < users.length; i++) {
    forLoopNames.push(users[i].name);
  }

  // 24. while loop: Loop while condition is true
  // Purpose: Collect user names
  // Return: string[] (e.g., ["Alice", "Bob", "Charlie", "David"])
  const whileLoopNames: string[] = [];
  let j = 0;
  while (j < users.length) {
    whileLoopNames.push(users[j].name);
    j++;
  }

  // 25. do-while loop: Loop at least once, then while condition is true
  // Purpose: Collect user names
  // Return: string[] (e.g., ["Alice", "Bob", "Charlie", "David"])
  const doWhileLoopNames: string[] = [];
  let k = 0;
  do {
    doWhileLoopNames.push(users[k].name);
    k++;
  } while (k < users.length);

  // 26. for...of loop: Iterate over array elements
  // Purpose: Collect user names
  // Return: string[] (e.g., ["Alice", "Bob", "Charlie", "David"])
  const forOfNames: string[] = [];
  for (const user of users) {
    forOfNames.push(user.name);
  }

  // 27. for...in loop: Iterate over array indices
  // Purpose: Collect indices and names
  // Return: string[] (e.g., ["Index: 0, Name: Alice", ...])
  const forInIndices: string[] = [];
  for (const index in users) {
    forInIndices.push(`Index: ${index}, Name: ${users[index].name}`);
  }

  // --- Word Frequency Example ---
  // Purpose: Demonstrate reduce for counting word frequencies in a string
  // Return: { [key: string]: number } (e.g., { hello: 2, world: 2, typescript: 1, is: 1, awesome: 1 })
  const text = "Hello world, hello TypeScript! World is awesome.";
  const wordFrequencies = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .split(/\s+/); // Split into words
  const wordCounts = wordFrequencies.reduce(
    (acc: { [key: string]: number }, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    },
    {}
  );
  console.log(wordCounts);

  // --- JSX Rendering ---
  return (
    <div style={{ padding: "20px" }}>
      <h1>Array Functions and Loops in Next.js with TypeScript</h1>

      <h2>1. map: User Names</h2>
      <ul>
        {userNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h2>2. filter: Active Users</h2>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.id}>
            {user.name} (Age: {user.age})
          </li>
        ))}
      </ul>

      <h2>3. reduce: Total Age</h2>
      <p>Total Age: {totalAge}</p>

      <h2>4. forEach: Check Console for Logs</h2>
      <p>(Open developer tools to see user names logged)</p>

      <h2>5. find: First User Over 30</h2>
      <p>
        {userOver30 ? `${userOver30.name} is over 30` : "No user over 30 found"}
      </p>

      <h2>6. some: Any Active User?</h2>
      <p>{hasActiveUser ? "Yes, there are active users" : "No active users"}</p>

      <h2>7. every: All Users Over 20?</h2>
      <p>{allOver20 ? "All users are over 20" : "Not all users are over 20"}</p>

      <h2>8. slice: First Two Users</h2>
      <ul>
        {firstTwoUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>9. sort: Users Sorted by Age</h2>
      <ul>
        {sortedByAge.map((user) => (
          <li key={user.id}>
            {user.name} (Age: {user.age})
          </li>
        ))}
      </ul>

      <h2>10. includes: Is Alice in the List?</h2>
      <p>{hasAlice ? "Alice is in the list" : "Alice is not in the list"}</p>

      <h2>11. findIndex: Index of First User Over 30</h2>
      <p>Index: {indexOver30 !== -1 ? indexOver30 : "Not found"}</p>

      <h2>12. concat: Combined Users</h2>
      <ul>
        {combinedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>13. join: Names as String</h2>
      <p>{namesString}</p>

      <h2>14. reverse: Reversed Users</h2>
      <ul>
        {reversedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>15. push: Users with New User</h2>
      <ul>
        {usersWithNew.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>16. pop: Last User Removed</h2>
      <p>Popped: {poppedUser?.name}</p>
      <ul>
        {usersWithoutLast.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>17. shift: First User Removed</h2>
      <p>Shifted: {shiftedUser?.name}</p>
      <ul>
        {usersWithoutFirst.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>18. unshift: New User at Start</h2>
      <ul>
        {usersWithNewStart.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>19. splice: Modified Users</h2>
      <ul>
        {splicedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>20. flat: Flattened Array</h2>
      <p>{flattenedArray.join(", ")}</p>

      <h2>21. flatMap: Doubled User IDs</h2>
      <p>{userIdsDoubled.join(", ")}</p>

      <h2>22. at: Last User</h2>
      <p>{lastUser?.name}</p>

      <h2>23. for Loop: Names</h2>
      <ul>
        {forLoopNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h2>24. while Loop: Names</h2>
      <ul>
        {whileLoopNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h2>25. do-while Loop: Names</h2>
      <ul>
        {doWhileLoopNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h2>26. for...of Loop: Names</h2>
      <ul>
        {forOfNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <h2>27. for...in Loop: Indices and Names</h2>
      <ul>
        {forInIndices.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}
