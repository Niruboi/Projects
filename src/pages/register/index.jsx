import React, { useEffect } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Orghosp from "./orghosp";
import { RegisterUser } from "../../apicalls/users";
import { getAntdInputValidation } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/LoaderSlice";

function Register() {
  const [type, setType] = React.useState("donar");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      dispatch(setLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white shadow rounded grid grid-cols-2 p-5 gap-5 w-1/2"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase">
          <span className="text-primary">
            {type.toUpperCase()} - Registration
          </span>
          <hr />
        </h1>

        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>

        {type === "donar" && (
          <>
            {" "}
            <Form.Item label="Name" name="name" rules={getAntdInputValidation()}>
              <Input placeholder="name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={getAntdInputValidation()}>
              <Input type="password" />
            </Form.Item>
          </>
        )}

        {type !== "donar" && <Orghosp type={type} />}

        <Button type="primary" block className="col-span-2" htmlType="submit">
          Register
        </Button>
        <Link
          to="/login"
          className="col-span-2 text-center text-gray-700 underline"
        >
          Already have Account ! Login Here{" "}
        </Link>
      </Form>
    </div>
  );
}

export default Register;
