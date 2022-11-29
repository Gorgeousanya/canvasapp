import { FC } from 'react';
import { TListItem } from '../../types';
import { Badge} from '@salutejs/plasma-ui';
import { body1, headline2, caption } from '@salutejs/plasma-tokens';
import styles from './list-item.module.css';

const ListItem: FC<TListItem>= ({index, title, subtitle}) => {

    return (
        <div className={styles.item}>
          <Badge text={String(index)} size="l" style={{ backgroundColor: "rgba(255, 255, 255, .4)", margin: "6px 8px 0 0" }}/>
          <main >
            <span style={body1}>{title}</span>
            <p >{subtitle}</p>
          </main>
        </div>
    )
}

export default ListItem;