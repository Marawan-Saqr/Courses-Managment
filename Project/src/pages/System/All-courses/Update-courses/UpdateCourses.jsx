import { useEffect } from "react";
import './UpdateCourses.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Container, Row, Col } from "react-bootstrap";
import Buttons from '../../../../Shared/Styled-components/StyledComponents';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from "react-router-dom";


const UpdateCourses = () => {

  // Zod Scheme
  const schema = z.object({
    name: z.string()
      .nonempty({ message: "Course name Is Required" })
      .min(5, { message: "Course name must be at least 5 characters long" })
      .max(20, { message: "Course name must not exceed 20 characters" }),
    type: z.string()
      .nonempty({ message: "Course Type Is Required"})
      .min(5, {message: "Course Type must be at least 5 characters long" })
      .max(20, {message: "Course Type must not exceed 20 characters" }),
    instructor: z.string()
      .nonempty({ message: "Instructor Is Required"})
      .min(5, {message: "Instructor must be at least 5 characters long" })
      .max(20, {message: "Instructor must not exceed 20 characters" }),
    hours: z.number()
      .min(5, {message: "Hours must be at least 5 Hours" })
      .max(300, {message: "Hours must not exceed 300 Hours" }),
    difficulty: z.string()
      .nonempty({ message: "Difficulty Is Required"}),
    tools: z.string()
      .nonempty({ message: "Tools Is Required"})
      .min(5, {message: "Tools must be at least 5 characters long" })
      .max(20, {message: "Tools must not exceed 20 characters" }),
  });


  // React Hook Form Destruct & Zod Resolver
  const { register, handleSubmit, setValue, formState: { errors }} = useForm({ mode: 'onTouched', resolver: zodResolver(schema)});

  // Put Method
  const { state } = useLocation();
  const navigate = useNavigate();
  const updateCourse = handleSubmit(async (data) => {
    try {
      await axios.put(`http://localhost:3001/courses/${state.COURSEID}`, data);
      Swal.fire({
        title: "DONE!",
        text: "Your Course Has Been Updated!",
        icon: "success"
      }).then(() => {
        navigate("/system");
      });
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the course.",
        icon: "error"
      });
    }
  });

  useEffect(() => {
    if (state) {
      setValue("name", state.name);
      setValue("type", state.type);
      setValue("instructor", state.instructor);
      setValue("hours", state.hours);
      setValue("difficulty", state.difficulty);
      setValue("tools", state.tools);
    }
  }, [state])


  return (
    <section className="update-courses mb-5">
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Row className="w-100">
          <Col xs={12} md={8} lg={12} className="mx-auto">
            <h2 className="text-center mb-4">Update <Buttons.PrimarySpan>Courses</Buttons.PrimarySpan></h2>
            <Form onSubmit={handleSubmit(updateCourse)}>


              {/* Course Name */}
              <Form.Group controlId="formName" className="mt-4 mb-4">
                <Form.Label>Course Name</Form.Label>
                <Form.Control  type="text"  placeholder="Enter course name" {...register('name')} className={errors.name ? "border border-danger" : null} />
                  {errors.name && (<Form.Text className="text-danger border">
                  {errors.name.message}
                </Form.Text>
                )}
              </Form.Group>


              {/* Course Type */}
              <Form.Group controlId="formType" className="mt-4 mb-4">
                <Form.Label>Course Type</Form.Label>
                <Form.Control type="text" placeholder="Enter course type" {...register('type')} className={errors.type ? "border border-danger" : null} />
                  {errors.type && (<Form.Text className="text-danger border">
                  {errors.type.message}
                </Form.Text>
                )}
              </Form.Group>


              {/* Instructor */}
              <Form.Group controlId="formType" className="mt-4 mb-4">
                <Form.Label>Instructor</Form.Label>
                <Form.Control type="text" placeholder="Enter course type" {...register('instructor')} className={errors.Instructor ? "border border-danger" : null} />
                  {errors.instructor && (<Form.Text className="text-danger border">
                  {errors.instructor.message}
                </Form.Text>
                )}
              </Form.Group>


              {/* Hours */}
              <Form.Group controlId="formHours" className="mt-4 mb-4">
                <Form.Label>Hours</Form.Label>
                <Form.Control type="number" placeholder="Enter course hours" {...register('hours', { valueAsNumber: true })} className={errors.Hours ? "border border-danger" : null} />
                  {errors.hours && (<Form.Text className="text-danger">
                  {errors.hours.message}
                </Form.Text>
                )}
              </Form.Group>


              {/* Difficulty */}
              <Form.Group controlId="formDifficulty" className="mt-4 mb-4">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control as="select" {...register('difficulty')} className={errors.difficulty ? "border border-danger" : null}>
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Normal">Normal</option>
                  <option value="Hard">Hard</option>
                </Form.Control>
                  {errors.difficulty && (<Form.Text className="text-danger">
                  {errors.difficulty.message}
                </Form.Text>
                )}
              </Form.Group>


              {/* Tools */}
              <Form.Group controlId="formType" className="mt-4 mb-4">
                <Form.Label>Tools</Form.Label>
                <Form.Control type="text" placeholder="Enter Tools" {...register('tools')} className={errors.Tools ? "border border-danger" : null} />
                  {errors.tools && (<Form.Text className="text-danger border">
                  {errors.tools.message}
                </Form.Text>
                )}
              </Form.Group>

              <Buttons.UpdateButton type="submit" className="w-100">Create Course</Buttons.UpdateButton>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UpdateCourses;