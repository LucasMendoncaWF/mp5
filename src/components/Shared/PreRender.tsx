export default function PreRender() {
  return (
    <div className="w-0 h-0 opacity-0 overflow-hidden">
      <div style={{ backgroundImage: 'url(/images/note_1.png)' }}></div>
      <div style={{ backgroundImage: 'url(/images/note_2.png)' }}></div>
    </div>
  );
}
