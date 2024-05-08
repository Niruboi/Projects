import { Form, Input, Modal, Radio, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/LoaderSlice";
import { AddInventory } from "../../../apicalls/inventory";
import { getAntdInputValidation } from "../../../utils/helpers";

function InventoryForm({ open, setOpen, reloadData }) {
  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state.users);
  const [inventoryType, setInventoryType] = useState("in");
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await AddInventory({
        ...values,
        inventoryType,
        organization: currentUser._id,
      });
      dispatch(setLoading(false));
      if (response.success) {
        reloadData();
        message.success("Inventory added succesfully");
        setOpen(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Modal
        title="Add Inventory"
        open={open}
        onCancel={() => setOpen(false)}
        centered
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          layout="vertical"
          className="flex flex-col gap-3"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="Invenory Type" rules={getAntdInputValidation()}>
            <Radio.Group
              value={inventoryType}
              onChange={(e) => setInventoryType(e.target.value)}
            >
              <Radio value="in">In</Radio>
              <Radio value="out">Out</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={getAntdInputValidation()}
          >
            <select name="" id="">
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </Form.Item>

          <Form.Item
            label={inventoryType === "out" ? "Hospital Email" : "Donor Email"}
            name="email"
            rules={getAntdInputValidation()}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Quantity (ML)"
            name="quantity"
            rules={getAntdInputValidation()}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default InventoryForm;
