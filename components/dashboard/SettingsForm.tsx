import { useState, FormEvent } from 'react';
import { useUser, validateUser } from '../../lib/auth';
import { userRoles, permissions } from '../../types';

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    role: userRoles.END_USER,
    permission: permissions.READ,
  });
  const { user } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateUser(user, userRoles.CORPORATE_ADMIN)) {
      alert('You do not have the necessary permissions to perform this action.');
      return;
    }
    // Submit form data to the server
    console.log('Form submitted:', formData);
    // TODO: Implement the update settings API call
  };

  return (
    <form id="settingsForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
          <option value={userRoles.END_USER}>End User</option>
          <option value={userRoles.CORPORATE_ADMIN}>Corporate Admin</option>
          <option value={userRoles.SUPER_ADMIN}>Super Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor="permission">Permission:</label>
        <select id="permission" name="permission" value={formData.permission} onChange={handleInputChange}>
          <option value={permissions.READ}>Read</option>
          <option value={permissions.WRITE}>Write</option>
          <option value={permissions.DELETE}>Delete</option>
        </select>
      </div>
      <button type="submit">Update Settings</button>
    </form>
  );
};

export default SettingsForm;