interface Student {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${student.status})`;
}

const student: Student = {
  id: 1,
  name: "Seth Bongo",
  email: "rbongo581@gmail.com",
  status: "active",
};

console.log(formatStudent(student));
console.log();





interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const singleStudentResponse: ApiResponse<Student> = {
  success: true,
  data: student,
};

const studentListResponse: ApiResponse<Student[]> = {
  success: true,
  data: [
    student,
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      status: "active",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@example.com",
      status: "inactive",
    },
  ],
};

console.log("Single Student Response:", singleStudentResponse);

console.log("Student List Response:", studentListResponse);
console.log(`Total students in list: ${studentListResponse.data.length}`);
console.log();



function isStudent(obj: unknown): obj is Student {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const candidate = obj as Record<string, unknown>;
  const hasValidId =
    typeof candidate.id === "number" && !Number.isNaN(candidate.id);
  const hasValidName =
    typeof candidate.name === "string" && candidate.name.trim().length > 0;
  const hasValidEmail =
    typeof candidate.email === "string" && candidate.email.trim().length > 0;
  const hasValidStatus =
    candidate.status === "active" || candidate.status === "inactive";

  return hasValidId && hasValidName && hasValidEmail && hasValidStatus;
}


const validCandidate: unknown = {
  id: 101,
  name: "Alice Johnson",
  email: "alice@example.com",
  status: "active",
};

const invalidIdCandidate: unknown = {
  id: "STD-102", 
  name: "Bob Williams",
  email: "bob@example.com",
  status: "active",
};

const missingNameCandidate: unknown = {
  id: 103,
  email: "charlie@example.com",
  status: "inactive",
};

function testValidation(label: string, data: unknown): void {
  console.log(`Testing: ${label}`);
  console.log("Input:", JSON.stringify(data));
  if (isStudent(data)) {
    console.log(`  Result: VALID Student -> ${formatStudent(data)}`);
  } else {
    console.log("  Result: INVALID Student ");
  }
}

testValidation("1 Student Object", validCandidate);
testValidation("2 Student Object",
  invalidIdCandidate
);
testValidation("3 Student Object", missingNameCandidate);
