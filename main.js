const { exec } = require('child_process');

function parseTracerouteOutput(output) {
  const lines = output.split('\n');
  const times = [];

  for (const line of lines) {
    const match = line.match(/(\d+\.\d+)\s+ms/g); 
    if (match && match.length) {
      const last = match[match.length - 1];
      times.push(parseFloat(last));
    }
  }

  const total = times.reduce((sum, ms) => sum + ms, 0);
  return total.toFixed(3);
}

function tracerouteHost(host) {
  exec(`traceroute -n ${host}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`${host} -> erro: ${stderr.trim()}`);
      return;
    }

    const total = parseTracerouteOutput(stdout);
    console.log(`${host} -> ${total} ms`);
  });
}

// Lista de domínios ou IPs
const destinos = ['google.com']; //LISTA DE DNS

if (destinos.length === 0) {
  console.log('Uso: node dnsTempoTotal.js dominio_ou_ip1 dominio_ou_ip2 ...');
  process.exit(1);
}

for (const destino of destinos) {
  tracerouteHost(destino);
}
