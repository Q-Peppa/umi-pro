import { Checkbox, Divider, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { FC, useState } from 'react';
type IProps = {
  value: any;
  onChange?: (value: any) => void;
};

const allOptions = ['China', 'America'];
/**
 * @description 将来 allOptions , 以及select.option的逻辑都可以根据后端的数据重构
 */
const MultiDropCheckbox: FC<IProps> = (props) => {
  const { onChange, value } = props;
  const [state, setState] = useState<string[]>([]);
  const handleChange = (vals: string[]) => {
    console.log('handleChange', vals);
    setState(vals);
    onChange?.(vals);
  };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    handleChange(e.target.checked ? allOptions : []);
  };
  const dropdownRender = (dom: any) => {
    return (
      <React.Fragment>
        <Checkbox
          className={'px-3 py-0.5'}
          checked={state.length === 2}
          onChange={onCheckAllChange}
          indeterminate={state.length > 0 && state.length < 2}
        >
          All Select
        </Checkbox>
        <Divider className={'my-1'} />
        {dom}
      </React.Fragment>
    );
  };
  return (
    <Select
      onChange={(value, option) => {
        console.log('onChange', value, option);
        handleChange(value);
      }}
      value={value}
      optionLabelProp={'value'}
      mode={'multiple'}
      dropdownRender={dropdownRender}
      options={[
        {
          value: 'China',
          label: (
            <div className={'flex gap-[8px] items-center'}>
              <Checkbox checked={state.includes('China')} />
              <span>China</span>
            </div>
          ),
        },
        {
          value: 'America',
          label: (
            <div className={'flex gap-[8px] items-center'}>
              <Checkbox checked={state.includes('America')} />
              <span>America</span>
            </div>
          ),
        },
      ]}
    ></Select>
  );
};
export default MultiDropCheckbox;
