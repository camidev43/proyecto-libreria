import estilos from './TemplateName.module.css';
import useLogic from './useLogic';

export type Props = {
  initialValue?: number;
};

export const TemplateName = ({ initialValue = 0 }: Props) => {
  const { count, incrementCount } = useLogic(initialValue);

  return (
    <div className={estilos.templateName}>
      <h2 className={estilos.header}>Counter</h2>
      <button className={estilos.button} type='button' onClick={incrementCount}>
        Increment by one
      </button>
      <div>
        Total value: <strong>{count}</strong>
      </div>
    </div>
  );
};
