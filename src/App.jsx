import { useState, useEffect } from 'react';
import StudentItem from './StudentItem';
import { FaSearch, FaFilter } from 'react-icons/fa'; // Thêm biểu tượng tìm kiếm và lọc

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
    <div className="max-w-2xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Danh sách sinh viên</h1>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Lớp"
          value={stuClass}
          onChange={(e) => setStuClass(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          {editId !== null ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
        </button>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex items-center space-x-2 w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 w-1/2">
          <FaFilter className="text-gray-500" />
          <select
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn lớp</option>
            {classOptions.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="min-w-full border border-gray-300">
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
