interface Student {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
}

function getStatusLabel(status: unknown): string {
  if (typeof status !== "string") {
    return "Unknown Status";
  }

  const normalized = status.trim().toLowerCase();
  switch (normalized) {
    case "active":
      return "Active Student";
    case "inactive":
      return "Inactive Student";
    default:
      return "Unknown Status";
  }
}

function formatStudent(student: Student): string {
  return `${student.id} - ${student.name} (${getStatusLabel(student.status)})`;
}

const student: Student = {
  id: 1,
  name: "Seth Bongo",
  email: "rbongo581@gmail.com",
  status: "active",
};

console.log("==========================================");
console.log("         STUDENT SERVICES PORTAL          ");
console.log("==========================================");
console.log(`Current Student : ${formatStudent(student)}`);
console.log(`Contact Email   : ${student.email}`);
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


console.log("[Single Student Response]");

console.log(`  Student : ${formatStudent(singleStudentResponse.data)}`);
console.log(`  Email   : ${singleStudentResponse.data.email}`);
console.log();

console.log("[Student List Response]");

console.log(`  Count   : ${studentListResponse.data.length} student(s)`);
console.log("  List  :");
for (const s of studentListResponse.data) {
  console.log(`    • ${formatStudent(s)} | ${s.email}`);
}
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
  name: "Alice Johnsons",
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

function testValidation(testTitle: string, data: unknown): void {
  console.log(`Test: ${testTitle}`);
  console.log(`  Input  : ${JSON.stringify(data)}`);
  if (isStudent(data)) {
    console.log(`  Result : [VALID]   -> ${formatStudent(data)}`);
  } else {
    console.log(`  Result : [INVALID] -> Does not satisfy Student structure`);
  }
  console.log();
}

console.log("------------------------------------------");
console.log("Runtime Validation Tests");
console.log("------------------------------------------");
testValidation("Valid Student Object", validCandidate);
testValidation(
  "Invalid Object",
  invalidIdCandidate
);
testValidation("Invalid Object", missingNameCandidate);
console.log("==========================================");
