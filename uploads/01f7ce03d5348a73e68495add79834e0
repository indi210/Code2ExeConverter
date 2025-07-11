#!/usr/bin/env python3
"""
Sample Python script for testing the Quantum Intel Code2EXE Builder
This script demonstrates basic functionality that can be compiled to executable
"""

import sys
import os
from datetime import datetime

def main():
    print("🔥 Quantum Intelligence Test Application")
    print("=" * 50)
    print(f"Execution Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Python Version: {sys.version}")
    print(f"Platform: {sys.platform}")
    print(f"Current Directory: {os.getcwd()}")
    
    print("\n✅ Testing basic functionality...")
    
    # Test user input
    try:
        name = input("Enter your name: ")
        print(f"Hello, {name}! Your executable is working perfectly.")
    except EOFError:
        name = "Developer"
        print(f"Hello, {name}! Running in non-interactive mode.")
    
    # Test calculations
    result = sum(range(1, 101))
    print(f"Sum of 1-100: {result}")
    
    # Test file operations
    try:
        with open("test_output.txt", "w") as f:
            f.write(f"Test successful at {datetime.now()}\n")
        print("✅ File operations working")
    except Exception as e:
        print(f"⚠️ File operation error: {e}")
    
    print("\n🎉 Test completed successfully!")
    print("This Python script has been converted to a Windows executable")
    print("using the Quantum Intelligence Code2EXE Builder!")
    
    input("\nPress Enter to exit...")

if __name__ == "__main__":
    main()