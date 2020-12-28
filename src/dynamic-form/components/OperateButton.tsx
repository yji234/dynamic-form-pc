import React, { FC, useCallback } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

interface OperateButtonProps{
  formList: any;
}

const OperateButton: FC<OperateButtonProps> = (props) => {
  const { formList } = props;
  const hostory = useHistory();

  const handleReview = useCallback(() => {
    // console.log('handleReview', formList);
    sessionStorage.setItem('forms', JSON.stringify(formList));
    // hostory.push('/form/review');
    window.open('/form/review');
  }, [hostory, formList]);

  const handleSubmit = useCallback(() => {
    console.log('handleSubmit', formList);
  }, [formList]);

  return (
    <div className="operate-button">
      <Button onClick={handleReview} style={{ margin: '10px'}}>预览</Button>
      <Button onClick={handleSubmit} style={{ margin: '10px'}} type="primary">提交</Button>
    </div>
  );
};
 
export default OperateButton;
  