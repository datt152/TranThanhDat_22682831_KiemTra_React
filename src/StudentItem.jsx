import React from 'react';

function StudentItem({ student, onEdit, onDelete }) {
  return (
    <tr key={student.id} className="text-center">
      <td className="border px-4 py-2">{student.name}</td>
      <td className="border px-4 py-2">{student.class}</td>
      <td className="border px-4 py-2">{student.age}</td>
      <td className="border px-4 py-2 space-x-2">
        <button
          onClick={() => onEdit(student)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default StudentItem;
