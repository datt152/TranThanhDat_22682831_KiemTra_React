import { useState, useEffect } from 'react';
import StudentItem from './StudentItem';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [age, setAge] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  // Load danh sách sinh viên từ localStorage khi trang được tải lại
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('students'));
    if (savedStudents) {
      setStudents(savedStudents);
    }
  }, []);

  // Lưu danh sách sinh viên vào localStorage mỗi khi danh sách thay đổi
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  const handleAdd = () => {
    if (!name || !stuClass || !age) return;
    const newStudent = {
      id: Date.now(),
      name,
      class: stuClass,
      age: parseInt(age),
    };

    if (editId !== null) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editId ? { ...s, name, class: stuClass, age: parseInt(age) } : s
        )
      );
      setEditId(null);
      alert('Sửa thông tin sinh viên thành công!');
    } else {
      // Thêm sinh viên mới vào danh sách và lưu vào localStorage
      setStudents([...students, newStudent]);
      alert('Thêm sinh viên mới thành công!');
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

  const classFilteredStudents = selectedClass
    ? filteredStudents.filter((s) => s.class === selectedClass)
    : filteredStudents;

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const classOptions = [
    ...new Set(students.map((student) => student.class)),
  ];

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

      <div className="mb-4">
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="w-full border rounded px-3 py-1"
        >
          <option value="">Chọn lớp</option>
          {classOptions.map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>
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
          {classFilteredStudents.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
