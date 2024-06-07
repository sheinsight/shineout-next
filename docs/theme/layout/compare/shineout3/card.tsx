import { useEffect } from 'react';
import useStyles from '../style';
import { Card, setToken } from 'shineout';

const ButtonExample = () => {
  const classes = useStyles();

  useEffect(() => {
    setToken({
      selector: '#card1',
      token: {
        cardBackgroundColor: 'var(--soui-brand-1)',
        cardFontColor: 'var(--soui-brand-7)',
        cardBorderColor: 'var(--soui-brand-2)',
      },
    });
    setToken({
      selector: '#card2',
      token: {
        cardBackgroundColor: 'var(--soui-success-1)',
        cardFontColor: 'var(--soui-success-7)',
        cardBorderColor: 'var(--soui-success-2)',
      },
    });
    setToken({
      selector: '#card3',
      token: {
        cardBackgroundColor: 'var(--soui-danger-1)',
        cardFontColor: 'var(--soui-danger-7)',
        cardBorderColor: 'var(--soui-danger-2)',
      },
    });
  }, []);

  return (
    <div className={classes.card}>
      <div id='card1'>
        <Card style={{ width: 300 }} split>
          <Card.Header>Card title</Card.Header>
          <Card.Body>
            Joy in living comes from having fine emotions, trusting them, giving them the freedom of
            a bird in the open.
          </Card.Body>
        </Card>
      </div>
      <div id='card2'>
        <Card style={{ width: 300 }} split>
          <Card.Header>Card title</Card.Header>
          <Card.Body>
            Joy in living comes from having fine emotions, trusting them, giving them the freedom of
            a bird in the open.
          </Card.Body>
        </Card>
      </div>
      <div id='card3'>
        <Card style={{ width: 300 }} split>
          <Card.Header>Card title</Card.Header>
          <Card.Body>
            Joy in living comes from having fine emotions, trusting them, giving them the freedom of
            a bird in the open.
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ButtonExample;
