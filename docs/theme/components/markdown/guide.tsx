import store from '../../store';
import useStyles from '../style';
import { useSnapshot } from 'valtio';
import { Guides } from 'docs/types';

interface GuideProps {
  guides: Guides;
}

const Guide = (props: GuideProps) => {
  const { guides } = props;

  const classes = useStyles();
  const state = useSnapshot(store);

  return (
    <div className={classes.guide}>
      {guides[state.locales].map((guide, index) => {
        return (
          <div key={index}>
            <h2 className='title'>{guide.title}</h2>
            {guide.paragraphs.map((p, idx) => {
              return (
                <div key={idx}>
                  <p className='paragraph'>{p.paragraph}</p>
                  {p.image && <img className='image' src={p.image} alt='' />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Guide;
