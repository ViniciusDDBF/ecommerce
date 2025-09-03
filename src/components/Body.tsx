import React, { useState } from 'react';
import Button from './Button';

const Body = () => {
  const [input, setInput] = useState<string>('');
  const [tickets, setTickets] = useState<Array<string>>([]);
  const [selected, setSelected] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const handleTickets = () => {
    if (input.length !== 4) {
      setError('Ticker must be exactly 4 letters.');
      return;
    }
    if (tickets.length < 3) {
      setTickets([...tickets, input]);
      setInput('');
      setError('');
    }
  };

  const handleSelect = (e: React.FocusEvent<HTMLInputElement>) => {
    setSelected(e.currentTarget.id);
    setError('');
  };

  const handleReport = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // simulate loading
    console.log(tickets);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white font-sans px-4">
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] p-10 w-full max-w-lg flex flex-col items-center gap-6 border border-slate-700/50">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-amber-300 tracking-wide text-center drop-shadow-sm">
          Add up to <span className="text-amber-400">3 stock tickers</span>
        </h2>
        <p className="text-gray-400 text-center text-sm">
          Get a{' '}
          <span className="text-amber-200 font-semibold">super accurate</span>{' '}
          stock predictions report.
        </p>

        {/* Input + button */}
        <div className="flex w-full shadow-md">
          <input
            className={`rounded-l-xl px-4 py-3 w-full outline-none transition-all text-lg tracking-widest uppercase
              ${
                selected === 'ticker-input'
                  ? 'border-2 border-amber-400 bg-slate-900 text-white shadow-inner'
                  : 'border-2 border-slate-600 bg-slate-900 text-gray-300'
              }`}
            onFocus={handleSelect}
            onBlur={() => setSelected('')}
            maxLength={4}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            type="text"
            value={input}
            placeholder="e.g. AAPL"
            id="ticker-input"
          />
          <button
            className="rounded-r-xl bg-500 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold px-6 transition-all cursor-pointer text-lg"
            onClick={handleTickets}
          >
            +
          </button>
        </div>
        {error && (
          <p className="text-red-400 text-sm font-medium animate-pulse">
            {error}
          </p>
        )}

        {/* Tickets list */}
        <div className="flex flex-col gap-2 w-full">
          {tickets.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-amber-500/20 to-amber-400/10 rounded-xl px-4 py-2 text-left text-amber-200 shadow-lg border border-amber-400/30 hover:scale-[1.02] transition-transform"
            >
              {item}
            </div>
          ))}

          <div className="text-center">
            <Button loading variant="primary">
              Vini
            </Button>
            <button
              className="relative w-full py-3 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold transition-all cursor-pointer rounded-xl mt-4 text-lg flex justify-center items-center gap-2 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleReport}
              disabled={tickets.length === 0}
            >
              {loading ? (
                <span className="size-6 rounded-full border-4 border-slate-900 border-r-transparent animate-spin"></span>
              ) : (
                'Generate Report'
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-4">
          You can add{' '}
          <span className="text-amber-300">{3 - tickets.length}</span> more
          ticker(s).
        </p>
      </div>
    </div>
  );
};

export default Body;
