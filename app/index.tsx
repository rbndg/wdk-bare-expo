import React, { useState, useEffect} from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Worklet } from 'react-native-bare-kit'
import RNFS from 'react-native-fs';

const CURRENCIES = ['btc', 'eth'];
const ORANGE = '#FF8C00';

const storePath =  RNFS.DocumentDirectoryPath;

const iosBundle = require('../ios.bundle.cjs')
const androidBundle  = require('../android.bundle.cjs')

function rpcMsg(method : string, params : any[]) {
  return JSON.stringify({
    method, params
  })
}



export default function WalletScreen() {
  const [currency, setCurrency] = useState('btc');
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [loading, setLoading] = useState(true);
  const [displayData, setDisplayData] = useState<string | null>(null);
  const [ipc, setIpc] = useState<any>(null);
  const worklet = new Worklet()
  const [response, setReponse] = useState<string | null>(null)

  async function setupBundle() {

    const socket  = worklet.IPC
    setIpc(socket)
    socket.setEncoding('utf8')
    socket.on('data', (data : string) => {
      const str = JSON.parse(data)
      console.log("from bare", data)
      setDisplayData(JSON.stringify(str,null,1))
    })
    socket.write(rpcMsg('rpc.start', [{
      store_path : storePath
    }]))
  }

  useEffect(() => {
    console.log("START")
    const bundle = Platform.OS === 'ios' ? iosBundle : androidBundle
    worklet.start(
      '/app.bundle',
      bundle
    ).then(() => {
      setLoading(false)
      setupBundle()
    })
    .catch((e) => console.log(e))
    return () => {
      worklet.terminate()
    }
  }, [])


  const handleButtonPress = (action : string) => {
    if(action === 'newWallet') {
      return ipc?.write(rpcMsg(`manager.createWallet`, []))
    }
    ipc?.write(rpcMsg(`wallet.default.pay.${currency}.${action}`,[]))
  }


  if(loading) return <Text> Loading </Text>

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>WDK - Bare Demo</Text>

      <View style={styles.currencyButtons}>
        {CURRENCIES.map((curr) => (
          <TouchableOpacity 
            key={curr}
            style={[
              styles.currencyButton,
              currency === curr && styles.currencyButtonActive
            ]}
            onPress={() => setCurrency(curr)}
          >
            <Text style={[
              styles.currencyButtonText,
              currency === curr && styles.currencyButtonTextActive
            ]}>{curr}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('newWallet')}>
          <Text style={styles.buttonText}>New Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('getNewAddress')}>
          <Text style={styles.buttonText}>New Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('getTransactions')}>
          <Text style={styles.buttonText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('getFundedAddresses')}>
          <Text style={styles.buttonText}>Funded Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('getConnectionStatus')}>
          <Text style={styles.buttonText}>Connection Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('reconnect')}>
          <Text style={styles.buttonText}>Reconnect</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('getFeeEstimate')}>
          <Text style={styles.buttonText}>Fee Estimate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('getBalance')}>
          <Text style={styles.buttonText}>Balance</Text>
        </TouchableOpacity>
      </View>

      {displayData && (
        <View style={styles.dataDisplay}>
          <Text style={styles.dataDisplayTitle}>Response Data:</Text>
          <Text style={styles.dataDisplayContent}>{displayData}</Text>
        </View>
      )}

      <View style={styles.sendSection}>
        <Text style={styles.sectionTitle}>Send {currency}</Text>
        <TextInput
          style={styles.input}
          placeholder="Sender Address"
          placeholderTextColor="#666"
          value={senderAddress}
          onChangeText={setSenderAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipient Address"
          placeholderTextColor="#666"
          value={recipientAddress}
          onChangeText={setRecipientAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="#666"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Fee"
          placeholderTextColor="#666"
          value={fee}
          onChangeText={setFee}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: ORANGE,
  },
  currencyButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  currencyButton: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: ORANGE,
  },
  currencyButtonActive: {
    backgroundColor: ORANGE,
  },
  currencyButtonText: {
    color: ORANGE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyButtonTextActive: {
    color: '#000000',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ORANGE,
  },
  buttonText: {
    color: ORANGE,
    fontSize: 16,
    fontWeight: '500',
  },
  dataDisplay: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: ORANGE,
  },
  dataDisplayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ORANGE,
    marginBottom: 8,
  },
  dataDisplayContent: {
    fontFamily: 'monospace',
    color: '#FFFFFF',
  },
  sendSection: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ORANGE,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: ORANGE,
  },
  input: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: ORANGE,
  },
  sendButton: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: ORANGE,
  },
});
