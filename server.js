const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Supabase setup
const supabaseUrl = 'https://eajlcmeqfuakhwqnmmnx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhamxjbWVxZnVha2h3cW5tbW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MzIzMjUsImV4cCI6MjA2MTMwODMyNX0.NgOZQICk1zH5A0Sc4MTU9I91l3rXGhf37Vy9BOKYgIc';

const supabase = createClient(supabaseUrl, supabaseKey);

// API untuk buat paste baru
app.post('/api/paste', async (req, res) => {
  const text = req.body.text;
  const id = Math.random().toString(36).substr(2, 8); // ID random

  const { data, error } = await supabase
    .from('pastes')
    .insert([
      { id: id, content: text }
    ]);

  if (error) {
    console.error('Error insert:', error);
    return res.status(500).json({ error: 'Failed to save paste' });
  }

  res.json({ url: `https://copy.ulinnuha.id/paste.html?id=${id}` });
});

// API untuk ambil paste berdasarkan id
app.get('/api/paste/:id', async (req, res) => {
  const id = req.params.id;

  const { data, error } = await supabase
    .from('pastes')
    .select('content')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetch:', error);
    return res.status(404).json({ error: 'Paste not found' });
  }

  res.json({ text: data.content });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
