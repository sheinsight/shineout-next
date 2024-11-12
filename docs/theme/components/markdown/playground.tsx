import { MarkdownProps } from 'docs/types';
import useStyles from '../style';
// import Anchor from 'docs/theme/layout/desktop/anchor';
import Collocator from '../collocator';

const PlayGround = (props: MarkdownProps['playground']) => {
  const {name, api, examples} = props
  const classes = useStyles();

  return (
    <div className={classes.playground}>
      <Collocator api={api} name={name} examples={examples} className={classes.collocator} />
      {/* <div className='anchor' style={{ width: 192 }}>
        <Anchor anchorName='playground' data={[name]}></Anchor>
      </div> */}
    </div>
  )
}

export default PlayGround;