import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Container, Row, Col } from "react-bootstrap";
import Buttons from "../../../../Shared/Styled-components/StyledComponents";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateStudent = () => {
  // State for courses
  const [courses, setCourses] = useState([]);

  // Zod Schema
  const schema = z.object({
    name: z.string().nonempty({ message: "Name is required" }).min(2).max(50),
    email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
    age: z.number().min(18, { message: "Age must be at least 18" }).max(120),
    gender: z.string().nonempty({ message: "Gender is required" }).min(2),
    course: z.string().nonempty({ message: "Course is required" }).min(2),
  });

  // React Hook Form Destruct & Zod Resolver
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });

  // Put Method
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const updateUser = handleSubmit(async (data) => {
    try {
      await axios.put(`https://veil-flicker-piano.glitch.me/students/${state.id}`, data);
      Swal.fire({ title: "DONE!", text: "Student has been updated!", icon: "success" }).then(() => {
        navigate("/system/students");
      });
    } catch (error) {
      console.error("Error updating student:", error);
      Swal.fire({ title: "Error!", text: "There was an issue updating the student.", icon: "error" });
    }
  });

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://veil-flicker-piano.glitch.me/courses');
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (state) {
      setValue("name", state.name);
      setValue("email", state.email);
      setValue("age", state.age);
      setValue("gender", state.gender);
      setValue("course", state.course);
    }
  }, [state, setValue]);

  return (
    <section className="update-user mb-5">
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Row className="w-100">
          <Col xs={12} md={8} lg={12} className="mx-auto">
            <h2 className="text-center mb-4">UPDATE <Buttons.PrimarySpan>STUDENT</Buttons.PrimarySpan></h2>
            <Form onSubmit={handleSubmit(updateUser)}>
              {/* Name */}
              <Form.Group controlId="formName" className="mt-4 mb-4">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  {...register("name")}
                  className={errors.name ? "border border-danger" : null}
                />
                {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
              </Form.Group>

              {/* Email */}
              <Form.Group controlId="formEmail" className="mt-4 mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                  className={errors.email ? "border border-danger" : null}
                />
                {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
              </Form.Group>

              {/* Age */}
              <Form.Group controlId="formAge" className="mt-4 mb-4">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  {...register("age", { valueAsNumber: true })}
                  className={errors.age ? "border border-danger" : null}
                />
                {errors.age && <Form.Text className="text-danger">{errors.age.message}</Form.Text>}
              </Form.Group>

              {/* Gender */}
              <Form.Group controlId="formGender" className="mt-4 mb-4">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  {...register("gender")}
                  className={errors.gender ? "border border-danger" : ""}
                >
                  <option value="">Select gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </Form.Control>
                {errors.gender && <Form.Text className="text-danger">{errors.gender.message}</Form.Text>}
              </Form.Group>

              {/* Course */}
              <Form.Group controlId="formCourse" className="mt-4 mb-4">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  as="select"
                  {...register("course")}
                  className={errors.course ? "border border-danger" : null}
                >
                  <option value="">Select course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </Form.Control>
                {errors.course && <Form.Text className="text-danger">{errors.course.message}</Form.Text>}
              </Form.Group>

              <Buttons.UpdateButton type="submit" className="w-100">Update User</Buttons.UpdateButton>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UpdateStudent;
