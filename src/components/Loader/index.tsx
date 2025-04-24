import './Loader.scss';

interface Props {
  width?: string;
  height?: string;
  backgroundColor?: string;
  position?: 'absolute' | 'relative';
}

export default function Loader({
  width = '30px',
  height = '30px',
  backgroundColor = 'transparent',
  position = 'relative',
}: Props) {
  return (
    <div
      style={{ width, height, backgroundColor, position }}
      className="flex flex-wrap justify-center content-center top-0 left-0"
    >
      <div className="loader">
        <div className="loader__notes"></div>
      </div>
    </div>
  );
}
