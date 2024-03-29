import React, { FC } from 'react';

export const SOLIcon: FC = () => {
    return (
        <svg
            fill="none"
            height="32"
            viewBox="0 0 40 40"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <linearGradient id="a" x1=".08441" x2=".88501" y1="1.02384" y2="-.03043">
                <stop offset=".08" stopColor="#9945ff" />
                <stop offset=".3" stopColor="#8752f3" />
                <stop offset=".5" stopColor="#5497d5" />
                <stop offset=".6" stopColor="#43b4ca" />
                <stop offset=".72" stopColor="#28e0b9" />
                <stop offset=".97" stopColor="#19fb9b" />
            </linearGradient>
            <circle cx="20" cy="20" fill="#000000" r="20" />
            <path
                d="m27.91759 24.038-2.6413 2.7713c-.0574.0602-.1269.1082-.2041.141s-.1604.0497-.2446.0497h-12.52097c-.05974 0-.11818-.0171-.16814-.0491-.04996-.0321-.08926-.0777-.11308-.1313-.02381-.0536-.0311-.1129-.02097-.1705s.03724-.111.078-.1538l2.64328-2.7713c.05726-.06.12651-.1079.20346-.1407s.15996-.0498.2439-.05h12.52032c.0597 0 .1182.0171.1681.0492.05.032.0893.0776.1131.1313.0238.0536.0311.1128.021.1704-.0102.0576-.0373.1111-.078.1538zm-2.6413-5.5807c-.0574-.0602-.1269-.1082-.2041-.141s-.1604-.0497-.2446-.0496h-12.52097c-.05974 0-.11818.017-.16814.0491s-.08926.0777-.11308.1313c-.02381.0536-.0311.1128-.02097.1704s.03724.1111.078.1538l2.64328 2.7714c.05726.06.12651.1079.20346.1407s.15996.0498.2439.0499h12.52032c.0597 0 .1182-.017.1681-.0491.05-.0321.0893-.0777.1131-.1313s.0311-.1128.021-.1704c-.0102-.0576-.0373-.1111-.078-.1538zm-12.96967-1.9906h12.52097c.0842 0 .1674-.0169.2446-.0497s.1467-.0808.2041-.141l2.6413-2.7713c.0407-.0428.0678-.0962.078-.1538.0101-.0576.0028-.1169-.021-.1705s-.0631-.0992-.1131-.1313c-.0499-.032-.1084-.0491-.1681-.0491h-12.52032c-.08394.0001-.16695.0171-.2439.0499s-.1462.0807-.20346.1408l-2.6426 2.7713c-.04072.0427-.06781.0961-.07797.1536-.01015.0576-.00292.1168.02081.1703.02373.0536.06292.0993.11278.1314s.10821.0492.16789.0494z"
                fill="url(#a)"
            />
        </svg>
    );
};
