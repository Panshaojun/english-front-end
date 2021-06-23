import { FC } from 'react';
import { Popover } from 'antd';
import { KaoyanVocabularyData } from '@/api/modules/server/kaoyan-vocabulary';
import './index.scss';
const Vocabulary: FC<{ data: KaoyanVocabularyData | undefined }> = ({ data, children }) => {
    const content = data ? (
        <div className="c-vocabulary">
            <h2>{data.w}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.short }}></p>
            <p dangerouslySetInnerHTML={{ __html: data.long }}></p>
        </div>
    ) : (<div className="c-vocabulary">
        <h2>找不到数据</h2>
        <p></p>
        <p></p>
    </div>);
    return (
        <Popover content={content} title="vocabulary词典">
            <div className="c-vocabulary-indicator">{children}</div>
        </Popover>
    )
}

export default Vocabulary;