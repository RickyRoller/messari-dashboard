import React, { FC } from 'react';
import styles from './token-bar.module.scss';
import Select from 'antd/lib/select';
import { TOKEN_URL, TOKENS } from '../../services/constants';
import { Token } from '../../models/token';

const { Option } = Select;

interface Props {
  token: Token;
  onTokenSelect: (token: Token) => void;
}

export const TokenBar: FC<Props> = ({ onTokenSelect, token }) => {
  const tokenSelected = (symbol: string) => {
    const t = TOKENS.find((d: Token) => symbol === d.symbol);
    if (t !== undefined) onTokenSelect(t);
  };

  return (
    <div className={styles.TokenBar}>
      <div className={styles.token}>
        <span>{token.name}</span>
        <span className={styles.symbol}>({token.symbol})</span>
      </div>
      <div className={styles.tokenSelector}>
        <Select
          onChange={tokenSelected}
          value={token.symbol}
          dropdownClassName={styles.selectDropdown}
        >
          {TOKENS.map((d) => (
            <Option
              value={d.symbol}
              className={styles.selectOption}
              key={d.symbol}
            >
              <img
                className={styles.tokenSymbol}
                src={TOKEN_URL(d.iconId)}
                alt={`${d.symbol} logo`}
              />
              <span>{d.symbol}</span>
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
