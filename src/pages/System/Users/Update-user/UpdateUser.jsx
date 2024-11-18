import { useEffect } from "react";
import "./UpdateUser.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Container, Row, Col } from "react-bootstrap";
import Buttons from "../../../../Shared/Styled-components/StyledComponents";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateUser = () => {
  // Zod Schema
  const schema = z.object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must not exceed 50 characters" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .nonempty({ message: "Email is required" }),
    age: z
      .number()
      .min(18, { message: "Age must be at least 18" })
      .max(120, { message: "Age must not exceed 120" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  // React Hook Form Destruct & Zod Resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: zodResolver(schema) });

  // Put Method
  const { state } = useLocation();
  const navigate = useNavigate();
  const updateUser = handleSubmit(async (data) => {
    try {
      await axios.put(`https://veil-flicker-piano.glitch.me/users/${state.id}`, data);
      Swal.fire({
        title: "DONE!",
        text: "User has been updated!",
        icon: "success",
      }).then(() => {
        navigate("/system/users"); // Adjust the navigation path as needed
      });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the user.",
        icon: "error",
      });
    }
  });

  useEffect(() => {
    if (state) {
      setValue("name", state.name);
      setValue("email", state.email);
      setValue("age", state.age);
      setValue("password", state.password);
    }
  }, [state, setValue]);

  return (
    <section className="update-user mb-5">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row className="w-100">
          <Col xs={12} md={8} lg={12} className="mx-auto">
            <h2 className="text-center mb-4">
              UPDATE <Buttons.PrimarySpan>USER</Buttons.PrimarySpan>
            </h2>
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
                {errors.name && (
                  <Form.Text className="text-danger">
                    {errors.name.message}
                  </Form.Text>
                )}
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
                {errors.email && (
                  <Form.Text className="text-danger">
                    {errors.email.message}
                  </Form.Text>
                )}
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
                {errors.age && (
                  <Form.Text className="text-danger">
                    {errors.age.message}
                  </Form.Text>
                )}
              </Form.Group>

              {/* Password */}
              <Form.Group controlId="formPassword" className="mt-4 mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                  className={errors.password ? "border border-danger" : null}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Buttons.UpdateButton type="submit" className="w-100">
                Update User
              </Buttons.UpdateButton>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UpdateUser;
