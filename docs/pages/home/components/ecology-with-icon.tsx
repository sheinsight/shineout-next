import useStyle from '../style';
import { chat } from '../svg';

export interface EcologyWithIconProps {
  content: string
}

const EcologyWithIcon = (props: EcologyWithIconProps) => {
  const { content } = props
  const styles = useStyle();
  
  return (
    <div className={styles.ecologyWithIcon}>
      {content}
      {chat}
    </div>
  )
}

export default EcologyWithIcon