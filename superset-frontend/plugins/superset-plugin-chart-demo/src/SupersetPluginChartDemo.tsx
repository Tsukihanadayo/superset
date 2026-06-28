import styled from '@emotion/styled';
import { SupersetPluginChartDemoProps, SupersetPluginChartDemoStylesProps } from './types';
import { useState } from 'react';

const Styles = styled.div<SupersetPluginChartDemoStylesProps>`
  position: relative;  
  background-color: ${({ theme }) => theme.colorPrimaryBg};
  padding: ${({ theme }) => theme.sizeUnit * 4}px;
  border-radius: ${({ theme }) => theme.borderRadius * 2}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizeUnit * 3}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  box-sizing: border-box;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(15, 23, 42, 0.06);
  font-weight: ${({ boldText }) => (boldText ? 700 : 400)};
`;

const Header = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: white;
  font-size: 13px;
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
  }

  &:focus {
    border-color: rgba(59, 130, 246, 0.8);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
  }
`;

const Ring = styled.svg<{ strokeWidth: number }>`
  transform: rotate(-90deg);
  width: 100%;
  max-width: 220px;
  height: auto;
  overflow: visible;
  stroke-linecap: round;
  stroke-width: ${({ strokeWidth }) => strokeWidth};
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  gap: 4px;
`;

const Title = styled.div<{ size: string }>`
  font-size: ${({ size }) => size};
  color: rgba(15, 23, 42, 0.7);
  margin-top: 2px;
`;

const Value = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: rgba(15, 23, 42, 0.92);
  letter-spacing: -0.5px;
`;

const fontSizeMap: Record<string, string> = {
  fontSizeSM: '12px',
  fontSize: '14px',
  fontSizeLG: '16px',
  fontSizeXL: '20px',
  fontSizeHeading1: '24px',
  fontSizeHeading2: '20px',
  fontSizeHeading3: '16px',
  fontSizeHeading4: '14px',
  fontSizeHeading5: '12px',
};

export default function SupersetPluginChartDemo(props: SupersetPluginChartDemoProps) {
  const {
    height,
    width,
    headerText,
    boldText,
    headerFontSize,
    progressColor,
    maxValue,
    strokeWidth,
    progressData,
  } = props;

  const [selectedName, setSelectedName] = useState(progressData?.[0]?.name ?? '');
  const selectedData = progressData?.find(item => item.name === selectedName) ?? { name: '', value: 0 };
  const safeMax = Math.max(Number(maxValue) || 100, 1);
  const safeProgressValue = Number.isFinite(selectedData.value) ? selectedData.value : 0;
  const ratio = Math.min(Math.max(safeProgressValue / safeMax, 0), 1);
  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference * (1 - ratio);
  const titleSize = fontSizeMap[headerFontSize] ?? '14px';
  const safeStrokeWidth = Math.max(Number(strokeWidth) || 18, 1);

  return (
    <Styles
      boldText={boldText}
      headerFontSize={headerFontSize}
      height={height}
      width={width}
    >
      <Header>
        <Select
          value={selectedName}
          onChange={e => setSelectedName(e.target.value)}
        >
          {progressData.map(item => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
      </Header>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <Ring strokeWidth={safeStrokeWidth} viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r="56"
            fill="none"
            stroke="rgba(15, 23, 42, 0.08)"
            strokeWidth={safeStrokeWidth}
          />
          <circle
            cx="70"
            cy="70"
            r="56"
            fill="none"
            stroke={progressColor}
            strokeWidth={safeStrokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Ring>

        <Center>
          <Value>
            {Math.round(ratio * 100)}%
          </Value>
          <Title size={titleSize}>
            {headerText}
          </Title>
        </Center>
      </div>
    </Styles>
  );
}
