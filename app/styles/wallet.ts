import { StyleSheet } from 'react-native';

export const ORANGE = '#FF8C00';

export const styles = StyleSheet.create({
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