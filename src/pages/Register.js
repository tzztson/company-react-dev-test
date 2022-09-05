import { useState } from 'react';

import { isRequired, useForm } from '../core/hooks/form';

import './Register.css';
import Card from '../components/Card/Card';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  color: '#000000',
  gender: 'male',
};

const Register = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [payload, setPayload] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const validations = [
    ({ firstName }) => isRequired(form.firstName, false) || { firstName: 'Name is required' },
    ({ lastName }) => isRequired(form.lastName, false) || { lastName: 'Surname is required' },
    ({ email }) => isRequired(form.email, true) || { email: 'E-mail is required' },
    ({ age }) => isRequired(form.age, false) || { age: 'Age is required' },
  ];

  const { errors, touched, changeHandler } = useForm(form, validations);

  const formChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setIsFormValid(Boolean(form.firstName && form.lastName && form.email && form.age));
  };

  return (
    <section>
      <div className="form">
        <Card
          bgcolor={'#ffffff'}
          heading="Register"
          subHeading="Please fill out the form and click the submit button to review your payload."
        >
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            label="First Name"
            value={form.firstName}
            onChange={formChange}
            onBlur={changeHandler}
            required
          >
            {touched.firstName && errors.firstName && <span className="error">{errors.firstName}</span>}
          </Input>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            label="Last Name"
            value={form.lastName}
            onChange={formChange}
            onBlur={changeHandler}
            required
          >
            {touched.lastName && errors.lastName && <span className="error">{errors.lastName}</span>}
          </Input>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="john.doe@email.com"
            label="Email"
            value={form.email}
            onChange={formChange}
            onBlur={changeHandler}
            required
          >
            {touched.email && errors.email && <span className="error">{errors.email}</span>}
          </Input>
          <div className="d-flex justify-between">
            <div className="age-wrapper">
              <Input
                type="number"
                id="age"
                name="age"
                placeholder="35"
                label="Age"
                value={form.age}
                onChange={formChange}
                onBlur={changeHandler}
                required
              >
                {touched.age && errors.age && <span className="error">{errors.age}</span>}
              </Input>
            </div>
            <div className="d-flex gender-wrapper">
              <Input type="radio" id="male" name="gender" label="Male" value="male" onChange={formChange} />
              <Input type="radio" id="female" name="gender" label="Female" value="female" onChange={formChange} />
            </div>
            <Input
              type="color"
              id="color"
              name="color"
              label="Favourite Color"
              value={form.color}
              onChange={formChange}
            />
          </div>

          <div className="d-flex justify-between button-wrapper">
            <Button
              type="submit"
              color="lightyellow"
              bgcolor="green"
              text="Submit"
              px={30}
              py={10}
              disabled={!isFormValid || errors.firstName || errors.lastName || errors.email || errors.age}
              onClick={() => {
                setPayload(form);
                setIsFormValid(false);
                setForm({ ...initialForm });
              }}
            />

            <Button
              color="white"
              bgcolor="red"
              text="Cancel"
              px={30}
              py={10}
              onClick={() => {
                setForm({ ...initialForm });
                setIsFormValid(false);
                setPayload(null);
              }}
            />
          </div>
        </Card>

        {payload && (
          <div className="mt-30">
            <Card bgcolor={'#a5f3fc'}>
              <div className="card-content">
                <p>
                  First Name: <span>{payload.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{payload.lastName}</span>
                </p>
                <p>
                  Email: <span>{payload.email}</span>
                </p>
                <p>
                  Age: <span>{payload.age}</span>
                </p>
                <p>
                  Gender: <span>{payload.gender}</span>
                </p>
                <p>
                  Favorite Color: <span>{payload.color}</span>
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
