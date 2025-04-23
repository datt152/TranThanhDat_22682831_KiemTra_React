import { useState } from 'react';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyen Van A', class: '10A1', age: 18 },
    { id: 2, name: 'Tran Thi B', class: '10A2', age: 17 },
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Họ tên</th>
            <th className="border p-2">Lớp</th>
            <th className="border p-2">Tuổi</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.class}</td>
              <td className="border p-2">{student.age}</td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
