import store from '../../store';
import useStyles from '../style';
import { useSnapshot } from 'valtio';
import { Guides } from 'docs/types';
import Anchor from 'docs/theme/layout/desktop/anchor';

export interface GuideProps {
  guides: Guides;
}

const Guide = (props: GuideProps) => {
  const { guides } = props;
  const classes = useStyles();
  const state = useSnapshot(store);

  const anchors = guides[state.locales].map((i) => i.title);

  return (
    <div className={classes.guide}>
      <div className='guides'>
        {guides[state.locales].map((guide, index) => {
          return (
            <div className='guide' key={index}>
              <h2 className='title anchor-title' id={`guide-${guide.title}`}>
                {guide.title}
              </h2>
              {guide.paragraphs.map((p, idx) => {
                return (
                  <div key={idx}>
                    {/* <p className='paragraph'>{p.paragraph}</p> */}
                    {p.paragraph &&
                      p.paragraph.split('\n').map((p, idx) => {
                        return (
                          <p key={idx} className='paragraph'>
                            {p}
                          </p>
                        );
                      })}
                    {p.image && <img className='image' src={p.image} alt='' />}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className='anchor'>
        <Anchor anchorName='guide' data={anchors}></Anchor>
      </div>
    </div>
  );
};

export default Guide;
