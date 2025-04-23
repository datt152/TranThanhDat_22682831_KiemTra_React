import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load danh sách từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem('students');
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);

  // Lưu vào localStorage khi danh sách thay đổi
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAdd = () => {
    if (!name || !stuClass || !age) return;
    if (editId !== null) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editId ? { ...s, name, class: stuClass, age: parseInt(age) } : s
        )
      );
      setEditId(null);
      alert('Sửa thông tin sinh viên thành công!');
    } else {
      const newStudent = {
        id: Date.now(),
        name,
        class: stuClass,
        age: parseInt(age),
      };
      setStudents([...students, newStudent]);
    }
    setName('');
    setStuClass('');
    setAge('');
  };

  const handleDelete = (id) => {
    setStudents((prev) => {
      const updated = prev.filter((student) => student.id !== id);
      alert('Xoá sinh viên thành công!');
      return updated;
    });
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setStuClass(student.class);
    setAge(student.age.toString());
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {editId !== null ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded px-3 py-1"
        />
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
          {filteredStudents.map((student) => (
            <tr key={student.id} className="text-center">
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.class}</td>
              <td className="border px-4 py-2">{student.age}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                >
                  Sửa
                </button>
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
