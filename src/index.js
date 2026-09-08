"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatStudent(student) {
    return `${student.id} - ${student.name} (${student.status})`;
}
const student = {
    id: 1,
    name: "Seth Bongo",
    email: "seth@example.com",
    status: "active"
};
console.log(formatStudent(student));
//# sourceMappingURL=index.js.map