export const validate = (firstName, lastName, email, phone, reasonForVisit, description, address, sex, age, weight, setErrors) => {
  const newErrors = {};

  if (!firstName || !/^[a-zA-Z]+$/.test(firstName)) {
      newErrors.firstName = 'First name not valid.';
  }

  if (!lastName || !/^[a-zA-Z]+$/.test(lastName)) {
      newErrors.lastName = 'Last name not valid.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email must be a valid email address.';
  }

  if (!phone || !/^\d+$/.test(phone) || phone.length > 10) {
      newErrors.phone = 'Phone number must be valid.';
  }

  if (!reasonForVisit) {
      newErrors.reasonForVisit = 'Enter the reason for visit.';
  }

  if (!description) {
      newErrors.description = 'Enter a description of the problem.';
  }

  if (!address) {
      newErrors.address = 'Enter a valid address.';
  }

  if (!['male', 'female', 'other'].includes(sex.toLowerCase())) {
      newErrors.sex = 'Sex must be either male, female, or other.';
  }

  if (!age || !/^\d{1,3}$/.test(age)) {
      newErrors.age = 'Age must be a number not exceeding 3 digits.';
  }

  if (!weight || !/^\d{1,3}$/.test(weight)) {
      newErrors.weight = 'Weight must be a number not exceeding 3 digits.';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;        
};