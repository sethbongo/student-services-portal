interface Student {
id: number;
name: string;
email: string;
status: "active" | "inactive";
}

function formatStudent(student: Student): string {
return `${student.id} - ${student.name} (${student.status})`;
}

const student:Student = {
    id: 1,
    name: "Seth Bongo",
    email: 'rbongo581@gmail.com',
    status: 'active'
};

console.log(formatStudent(student));
