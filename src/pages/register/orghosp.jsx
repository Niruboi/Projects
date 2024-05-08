import React from 'react'
import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getAntdInputValidation } from '../../utils/helpers';

function Orghosp({type}) {
    return (
        <>
            <Form.Item 
                label={ type === "hospital" ? "Hospital Name" : "Organization Name" }
                name={type === "hospital" ? "hospitalname" : "organizationname"} rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item label="Owner" name="owner" rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item label="Website" name="website" rules={getAntdInputValidation()}>
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={getAntdInputValidation()}>
                <Input type='password' />
            </Form.Item>
            <Form.Item label="Adress" name="adress" className='col-span-2' rules={getAntdInputValidation()}>
                <TextArea />
            </Form.Item>
        </>
    )
}

export default Orghosp
