import MultiDropCheckbox from '@/components/EditableCheckbox/MultiDropCheckbox';
import {
  EditableProTable,
  ProColumns,
  ProForm,
} from '@ant-design/pro-components';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';

/**
 * @description 可编辑表格 + 自定义编辑的组件 + 下拉框带有全选的 Select
 * @date 2023/10/16 23:16
 * @author Peppa
 */
const EditableCheckbox = () => {
  const [editableKeys, setEditableRowKeys] = useState<any>();
  const columns: ProColumns<any>[] = [
    {
      dataIndex: 'address',
      title: 'address',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'please input all blank',
          },
        ],
      },
      renderFormItem: (_, { isEditable, value, onChange }) => {
        return isEditable ? (
          <MultiDropCheckbox value={value} onChange={onChange} />
        ) : (
          <Input />
        );
      },
    },
    {
      dataIndex: 'name',
      title: 'name',
    },
  ];
  const [formRef] = Form.useForm();
  return (
    <div>
      <Button
        className={'my-2 bg-[#1677ff] text-white'}
        onClick={() => {
          formRef.setFieldValue('table', [
            { id: 1, address: ['China'], name: 'name1' },
            { id: 2, address: ['America'], name: 'name2' },
            { id: 3, address: [], name: 'xxxx' },
          ]);
          setEditableRowKeys(['1', '2', '3']);
        }}
      >
        set Value
      </Button>
      <ProForm
        form={formRef}
        onFinish={async (vals) => {
          console.log(vals);
        }}
      >
        <EditableProTable
          name={'table'}
          rowKey={'id'}
          columns={columns}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: {
              id: Date.now(),
              address: [],
              name: 'name ?',
            },
          }}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
          }}
        />
      </ProForm>
    </div>
  );
};

export default EditableCheckbox;
