import { FC } from 'react';
import { Popover } from 'antd';
import './index.scss';
import { observer } from 'mobx-react';
import useVocabulary from '@/hooks/use-vocabulary';

const Vocabulary: FC<{ id: number }> = ({ id, children }) => {
    const data = useVocabulary(id);
    const content = data ? (
        <div className="c-vocabulary">
            <h2>{data.w}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.short }}></p>
            <p dangerouslySetInnerHTML={{ __html: data.long }}></p>
        </div>
    ) : (<div className="c-vocabulary">
        <h2>找不到数据</h2>
    </div>);
    return (
        <Popover content={content} title="vocabulary词典">
            <div className="c-vocabulary-indicator">{children}</div>
        </Popover>
    )
}

export default observer(Vocabulary);