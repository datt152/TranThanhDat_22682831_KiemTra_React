import { useState } from 'react';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Nguyen Van A', class: '10A1', age: 18 },
    { id: 2, name: 'Tran Thi B', class: '10A2', age: 17 },
  ]);

  // Bước 3: Thêm sinh viên mới
  // Commit: feat: thêm sinh viên mới
  const [name, setName] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [age, setAge] = useState('');

  const handleAdd = () => {
    if (!name || !stuClass || !age) return;
    const newStudent = {
      id: Date.now(),
      name,
      class: stuClass,
      age: parseInt(age),
    };
    setStudents([...students, newStudent]);
    setName('');
    setStuClass('');
    setAge('');
  };

  // Bước 4: Xoá sinh viên
  // Commit: feat: xoá sinh viên
  const handleDelete = (id) => {
    setStudents((prev) => {
      const updated = prev.filter((student) => student.id !== id);
      alert('Xoá sinh viên thành công!');
      return updated;
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-1"
        />
        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={(e) => setStuClass(e.target.value)}
          className="w-full border rounded px-3 py-1"
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded px-3 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Thêm sinh viên
        </button>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Họ tên</th>
            <th className="border px-4 py-2">Lớp</th>
            <th className="border px-4 py-2">Tuổi</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.class}</td>
              <td className="border px-4 py-2">{student.age}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;